import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatus } from "../utils/Enums";
import db from "../model/database";
import { Book } from "../utils/Types";

const getCluster = asyncHandler(async (req: Request, res: Response) => {
	const { clusterName, userName } = req.query;

	const booksInCluster: Book[] = [];

	if (clusterName && userName) {
		const filteredClusterName = (clusterName as string).replace(/"/g, "''");
		const filteredUserName = (userName as string).replace(/"/g, "''");

		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Clusters where clusterName="${filteredClusterName}" and user_id="${user_id}"`;
			const [cluster]: any[] = await db.promise().query(query);
			const { cluster_id } = cluster[0];

			query = `select book_id from Cluster_Book where cluster_id="${cluster_id}" and user_id="${user_id}";`;
			const [bookIds]: any[] = await db.promise().query(query);

			for (const { book_id } of bookIds) {
				booksInCluster.push(await findBookInfo(book_id));
			}

			res.status(HTTPStatus.OK).json(booksInCluster);
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const getAllClusters = asyncHandler(async (req: Request, res: Response) => {
	const { userName } = req.params;

	if (userName) {
		const filteredUserName = (userName as string).replace(/"/g, "''");
		try {
			let query = `select * from Users where userName="${filteredUserName}";`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Clusters where user_id="${user_id}"`;
			const [clusters]: any[] = await db.promise().query(query);

			res.status(HTTPStatus.OK).json(clusters);
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing username";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const addCluster = asyncHandler(async (req: Request, res: Response) => {
	const { clusterName, userName, visibility } = req.body;

	if (
		(clusterName && userName && visibility) ||
		(clusterName && userName && visibility === false)
	) {
		const filteredClusterName = clusterName.replace(/"/g, "''");
		const filteredUserName = userName.replace(/"/g, "''");

		try {
			let query = `select * from Users where userName='${filteredUserName}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Clusters where clusterName='${filteredClusterName}' and user_id='${user_id}';`;
			const [clusters]: any[] = await db.promise().query(query);

			if (clusters.length > 0) {
				res
					.status(HTTPStatus.BAD)
					.json(
						`Error: cluster with name ${clusterName} already exists for user`
					);
				throw new Error(
					`Error: cluster with name ${clusterName} already exists for user`
				);
			}

			query = `insert into Clusters (cluster_id, clusterName, user_id, visibility) values(DEFAULT,'${filteredClusterName}', '${user_id}', ${visibility});`;
			await db.promise().query(query);
			res.status(HTTPStatus.OK).json("Cluster successfully created");
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error. Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const updateCluster = asyncHandler(async (req: Request, res: Response) => {
	const { clusterName, newClusterName, userName, visibility } = req.body;

	if (
		(clusterName && newClusterName && userName && visibility) ||
		(clusterName && newClusterName && userName && visibility === false)
	) {
		const filteredClusterName = clusterName.replace(/"/g, "''");
		const filteredNewClusterName = newClusterName.replace(/"/g, "''");
		const filteredUserName = userName.replace(/"/g, "''");
		try {
			let query = `select * from Users where userName='${filteredUserName}';`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Clusters where clusterName='${filteredClusterName}' and user_id='${user_id}';`;
			const [cluster]: any[] = await db.promise().query(query);

			query = `select * from Clusters where clusterName='${filteredNewClusterName}' and user_id='${user_id}'`;
			const [duplicateClusterNames]: any[] = await db.promise().query(query);

			if (cluster.length > 0) {
				if (duplicateClusterNames.length > 0 && clusterName != newClusterName) {
					res
						.status(HTTPStatus.BAD)
						.json(
							`Error: a cluster with name ${newClusterName} already exists for user`
						);
					throw new Error(
						`Error: a cluster with name ${newClusterName} already exists for user`
					);
				} else {
					const { cluster_id } = cluster[0];
					query = `update Clusters set clusterName='${filteredNewClusterName}', visibility='${visibility}' where cluster_id='${cluster_id}'`;
					await db.promise().query(query);
				}
			} else {
				res
					.status(HTTPStatus.BAD)
					.json(
						`Error: cluster with name ${clusterName} was not found for user`
					);
				throw new Error(
					`Error: cluster with name ${clusterName} was not found for user`
				);
			}

			res.status(HTTPStatus.OK).json("Cluster successfully updated");
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	}
});

const deleteCluster = asyncHandler(async (req: Request, res: Response) => {
	const { clusterName, userName } = req.body;

	if (clusterName && userName) {
		const filteredClusterName = clusterName.replace(/"/g, "''");
		const filteredUserName = userName.replace(/"/g, "''");
		try {
			let query = `select * from Users where userName = "${filteredUserName}"`;
			const [user]: any[] = await db.promise().query(query);
			const { user_id } = user[0];

			query = `select * from Clusters where clusterName="${filteredClusterName}" and user_id="${user_id}"`;
			const [cluster]: any[] = await db.promise().query(query);
			const clusterExists = cluster.length > 0;
			if (clusterExists) {
				const { cluster_id } = cluster[0];

				query = `delete from Cluster_Book where cluster_id="${cluster_id}" and user_id="${user_id}";`;
				await db.promise().query(query);

				query = `delete from Clusters where cluster_id="${cluster_id}";`;
				await db.promise().query(query);

				res.status(HTTPStatus.OK).json("Successfully deleted cluster");
			} else {
				const errMsg = "Error, cluster does not exist";
				res.status(HTTPStatus.BAD).json(errMsg);
				throw new Error(errMsg);
			}
		} catch (err: any) {
			res.status(HTTPStatus.BAD).json(err.sqlMessage);
			throw new Error(err);
		}
	} else {
		const errMsg = "Error, Missing one or more params";
		res.status(HTTPStatus.BAD).json(errMsg);
		throw new Error(errMsg);
	}
});

const findBookInfo = async (bookId: number): Promise<Book> => {
	let query = `select Book_Author.author from Books inner join Book_Author on Books.book_id = Book_Author.book_id where Books.book_id = "${bookId}"`;
	let [authors]: any[] = await db.promise().query(query);
	authors = authors.map((ids: { [x: string]: any }) => ids["author"]);

	query = `select * from Books where book_id="${bookId}"`;
	const [book]: any[] = await db.promise().query(query);
	const { bookTitle, pageCount, description, bookCover } = book[0];

	return {
		title: bookTitle,
		authors,
		pageCount,
		description,
		cover: bookCover,
	};
};

export { getCluster, addCluster, updateCluster, deleteCluster, getAllClusters };

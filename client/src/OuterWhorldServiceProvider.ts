import { Book } from '../../server/src/utils/Types';

class OuterWhorldServiceProvider {
  // Returns array of books
  async getBookInfo(bookTitle: string): Promise<Book[]> {
    const res = await fetch(`/api/book?bookTitle=${bookTitle}`);
    const data = await res.json();
    console.log(data)
    return data;
  }

  // Returns all the books in individual cluster
  async getClusterInformation(clusterName: string, userName: string) {
    const res = await fetch(
      `/api/clusters?clusterName=${clusterName}&userName=${userName}`
    );
    const data = await res.json();

    return data;
  }

  async getAllClustersFromUser(userName: string) {
    const res = await fetch(`/api/clusters/${userName}`);
    const data = await res.json();
    
    return data;
  }

  // Returns success or failure
  async createCluster(
    clusterName: string,
    userName: string,
    visibility: boolean
  ) {
    const input = {
      clusterName,
      userName,
      visibility,
    };

    const res = await fetch(`/api/clusters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    return data;
  }

  async deleteCluster(clusterName: string, userName: string) {
    const input = {
      clusterName,
      userName,
    };

    const res = await fetch(`/api/clusters`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    return data;
  }

  /* 
@param clusterName - the current name for the cluster
@param userName - user the cluster belongs to (currently only 'andrei')
@param newClusterName - the 'new' name for the cluster (if the name is unchanged then clusterName = newClusterName)
@param visibility - the 'new' visibility for the cluster (if visibility is unchanged then the same visibilty value is passed in)
*/
  async updateClusterInformation(
    clusterName: string,
    userName: string,
    newClusterName: string,
    visibility: boolean
  ) {
    const input = {
      clusterName,
      userName,
      newClusterName,
      visibility,
    };

    const res = await fetch(`/api/clusters`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    return data;
  }

  async getBookFromCluster(
    clusterName: string,
    userName: string,
    title: string,
    pageNumbers: number,
    bookCoverLink: string
  ) {
    const res = await fetch(
      `/api/book?clusterName=${clusterName}&userName=${userName}&title=${title}&pageNumbers=${pageNumbers}&bookCoverLink=${bookCoverLink}`
    );
    const data = await res.json();

    return data;
  }

  // Returns success or failure
  async addBookToCluster(clusterName: string, userName: string, book: Book) {
    const { title, pageCount, cover } = book;

    const input = {
      clusterName,
      userName,
      bookTitle: title,
      pageCount,
      bookCover: cover,
    };

    const res = await fetch(`/api/booksInClusters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    return data;
  }

  // Returns success or failure
  async deleteBookFromCluster(
    clusterName: string,
    userName: string,
    book: Book
  ) {
    const { title, pageCount, cover } = book;

    const input = {
      clusterName,
      userName,
      bookTitle: title,
      pageCount,
      bookCover: cover,
    };

    const res = await fetch(`/api/booksInClusters`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    return data;
  }
}

const OWServiceProvider = new OuterWhorldServiceProvider();

export default OWServiceProvider;

import { Book } from '../../server/src/utils/Types';

class OuterWhorldServiceProvider {
  /*
  @param bookTitle - title of book to be queried
  @returns array of book objects containing bookTitle, authors, pageCount, description, and bookCover
  */
  async getBookInfo(bookTitle: string): Promise<Book[]> {
    const res = await fetch(`/api/book?bookTitle=${bookTitle}`);
    const data = await res.json();

    return data;
  }

  /*
  @param clusterName
  @param userName
  @returns array of book objects that belong to specified cluster and user
  */
  async getClusterInformation(clusterName: string, userName: string) {
    const res = await fetch(
      `/api/clusters?clusterName=${clusterName}&userName=${userName}`
    );
    const data = await res.json();

    return data;
  }

  /*
  @param userName
  @returns array of cluster objects containing clusterName and visibility
  */
  async getAllClustersFromUser(userName: string) {
    const res = await fetch(`/api/clusters/${userName}`);
    const data = await res.json();

    return data;
  }

  /*
  @param clusterName
  @param userName
  @param visibility - 'false' means cluster is private, 'true' means cluster is public
  @returns success or failure
  */
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

  /*
  @param clusterName
  @param userName
  @returns success or failure
  */
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

  /*
  @param clusterName
  @param userName
  @param title - book's title
  @param pageNumbers - book's page numbers
  @param bookCoverLink
  @returns book object
  */
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

  /*
  @param clusterName
  @param userName
  @param book - Book object
  @returns success or failure
  */
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

  /*
  @param clusterName
  @param userName
  @param book - Book object
  @returns success or failure
  */
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

  /*
  @param userName
  @returns Snail object
  */
  async getSnailInfo(userName: string) {
    const res = await fetch(`/api/snails/?userName=${userName}`);
    const data = await res.json();
    return data;
  }

  /*
  @param userName
  @param snailName - if keeping the same, pass in existing name
  @param snailColor - if keeping the same, pass in existing color
  @returns success or failure
  */
  async updateSnailInfo(
    userName: string,
    snailName: string,
    snailColor: string
  ) {
    const input = {
      userName,
      snailName,
      snailColor,
    };

    const res = await fetch(`/api/snails`, {
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

  /*
  @param userName
  @param snailName
  @param snailColor
  @returns success or failure
  */
  async createSnail(userName: string, snailName: string, snailColor: string) {
    const input = {
      userName,
      snailName,
      snailColor,
    };

    const res = await fetch(`/api/snails`, {
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

  /*
  @param userName
  @returns success or failure
  */
  async deleteSnail(userName: string) {
    const input = {
      userName,
    };

    const res = await fetch(`/api/snails`, {
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
  @param userName
  @param goalID
  @returns goal object with goal_id: number, notes:string, foundBook: Book
  */
  async getGoal(userName: string, goalID: number) {
    const res = await fetch(`/api/goals/${userName}/${goalID}`);

    const data = await res.json();

    return data;
  }

  /*
  @param userName
  @returns array of goal objects with goal_id: number, notes:string, foundBook: Book
  */
  async getAllGoals(userName: string) {
    const res = await fetch(`/api/goals/${userName}`);
    const data = await res.json();

    return data;
  }

  /*
  @param book
  @param userName
  @param notes - optional with default value being empty string
  @returns success or failure
  */
  async createGoal(book: Book, userName: string, notes: string = '') {
    const input = {
      book,
      userName,
      notes,
    };

    const res = await fetch(`/api/goals`, {
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
  /*
  @param goalID
  @param notes
  @returns success or failure
  */
  async updateGoal(goalID: number, notes: string) {
    const input = {
      goalID,
      notes,
    };

    const res = await fetch(`/api/goals`, {
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

  /*
  @param goalID
  @returns success or failure
  */
  async deleteGoal(goalID: number) {
    const input = {
      goalID,
    };

    const res = await fetch(`/api/goals`, {
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

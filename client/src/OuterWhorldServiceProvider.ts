import { Book } from '../../server/src/utils/Types';

class OuterWhorldServiceProvider {
  /*
  @param bookTitle - title of book to be queried
  @returns array of book objects containing bookTitle, authors, pageCount, description, and bookCover
  */
  async getBookInfo(bookTitle: string): Promise<Book[]> {
    const res = await fetch(`/api/book?bookTitle=${bookTitle}`);
    const data = await res.json();
    console.log('FROM OWS');
    console.log(data);
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
    visibility: boolean,
    date: string
  ) {
    const input = {
      clusterName,
      userName,
      visibility,
      date,
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
@param userName - user the cluster belongs to
@param newClusterName - the 'new' name for the cluster (if the name is unchanged then clusterName = newClusterName)
@param visibility - the 'new' visibility for the cluster (if visibility is unchanged then the same visibilty value is passed in)
*/
  async updateClusterInformation(
    clusterName: string,
    userName: string,
    newClusterName: string,
    visibility: boolean,
    date: string
  ) {
    const input = {
      clusterName,
      userName,
      newClusterName,
      visibility,
      date,
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
      `/api/booksInClusters?clusterName=${clusterName}&userName=${userName}&title=${title}&pageNumbers=${pageNumbers}&bookCoverLink=${encodeURIComponent(
        bookCoverLink
      )}`
    );
    const data = await res.json();

    return data;
  }

  /*
  @param clusterName
  @param userName
  @param book - Book object
  @param date - to set update time for cluster
  @returns success or failure
  */
  async addBookToCluster(
    clusterName: string,
    userName: string,
    book: Book,
    date: string
  ) {
    const { title, pageCount, cover } = book;

    const input = {
      clusterName,
      userName,
      bookTitle: title,
      pageCount,
      bookCover: cover,
      date,
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
    console.log(data);

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

    if (res.status != 200) {
      return null;
    }
    return data;
  }

  /*
  @param userName
  @returns Array of snail objects
  */
  async getAllSnails(userName: string) {
    const res = await fetch(`/api/snails/all/?userName=${userName}`);
    const data = await res.json();

    if (res.status !== 200) {
      return null;
    }
    return data;
  }

  /*
  @param userName
  @param snailName - if keeping the same, pass in existing name
  @param snailColor - if keeping the same, pass in existing color
  @param snailHealth - snails new health (0 means dead, 3 means full health)
  @param goalsCompleted
  @param goalsFailed
  @param accessories - currently equipped accessories for snail
  @param deathDate - snail death date
  @returns success or failure
  */
  async updateSnailInfo(
    userName: string,
    snailName: string,
    snailColor: string,
    snailHealth: number,
    goalsCompleted: number,
    goalsFailed: number,
    accessories: Object,
    isActive: Boolean,
    deathDate: string | null = null
  ) {
    accessories = JSON.stringify(accessories);
    const input = {
      userName,
      snailName,
      snailColor,
      snailHealth,
      goalsCompleted,
      goalsFailed,
      accessories,
      deathDate,
      isActive,
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
  async createSnail(
    userName: string,
    snailName: string,
    snailColor: string,
    date: string,
    isActive: boolean = true
  ) {
    const input = {
      userName,
      snailName,
      snailColor,
      date,
      isActive,
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
    // console.log(data)
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
  @param pageCount - current page user is on (on creation it should be 0)
  @param deadline - deadline date stringified
  @returns success or failure
  */
  async createGoal(
    book: Book,
    userName: string,
    notes: string = '',
    pageCount: number,
    deadline: string
  ) {
    const input = {
      book,
      userName,
      notes,
      pageCount,
      deadline,
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
    console.log(userName);
    console.log(book);
    return data;
  }
  /*
  @param goalID
  @param notes
  @param pageCount - current page user is on
  @returns success or failure
  */
  async updateGoal(
    goalID: number,
    notes: string,
    pageCount: number,
    completed: boolean
  ) {
    const input = {
      goalID,
      notes,
      pageCount,
      completed,
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

  /*
  @param username
  @param email
  @param password
  @returns success or failure
  */
  async registerUser(username: string, email: string, password: string) {
    const input = {
      name: username,
      email,
      password,
    };

    const res = await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    const payload = { status: res.status, data };

    return payload;
  }

  /*
  @param email
  @param password
  @returns token if authentication is successful
  */
  async authenticateUser(email: string, password: string) {
    const input = {
      email,
      password,
    };

    const res = await fetch(`/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    const payload = { status: res.status, data };

    return payload;
  }

  async getUserInformation(username: string) {
    const res = await fetch(`/api/users/${username}`);
    const data = await res.json();

    return data;
  }

  async signOutUser(username: string, date: string) {
    const input = {
      userName: username,
      signOutTime: date,
    };

    const res = await fetch(`/api/users/`, {
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
  @param graveID
  @returns snail info from associated grave
  */
  async getGrave(graveID: number) {
    const res = await fetch(`/api/graveyard?graveID=${graveID}`);
    const data = await res.json();

    return data;
  }

  /*
  @param username
  @returns array of graves for associated user
  */
  async getAllGraves(username: string) {
    const res = await fetch(`/api/graveyard/${username}`);
    const data = await res.json();

    return data;
  }

  /*
  @param snailName
  @param userName
  @param gravestone - grave img src
  @param grave_type - one of 3 types of headstones we offer
  @returns success or failure
  */
  async createGrave(
    snailName: string,
    userName: string,
    gravestone: string,
    grave_type: number
  ) {
    const input = {
      snailName,
      userName,
      gravestone,
      grave_type,
    };

    const res = await fetch(`/api/graveyard/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    console.log(data);
    return data;
  }

  /*
  @param graveyard_id
  @param gravestone - grave img src
  @param grave_type - one of 3 types of headstones we offer
  @returns success or failure
  */
  async updateGrave(
    graveyard_id: number,
    gravestone: string,
    grave_type: number
  ) {
    const input = {
      graveyard_id,
      gravestone,
      grave_type,
    };

    const res = await fetch(`/api/graveyard/`, {
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
  @param graveyard_id
  @returns success or failure
  */
  async deleteGrave(graveyard_id: number) {
    const input = {
      graveyard_id,
    };

    const res = await fetch(`/api/graveyard/`, {
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
  @param currency
  @returns success or failure
  */
  async updateUserInformation(userName: string, currency: number) {
    // console.log(userName, currency);
    const input = {
      userName,
      currency,
    };
    const res = await fetch(`/api/users/login`, {
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
  @param username
  @param id
  @returns accessory object
  */
  async getAccessory(username: string, accessoryID: number) {
    const res = await fetch(`/api/accessories/${username}/${accessoryID}`);

    const data = await res.json();

    return data;
  }

  /*
  @param username
  @returns array of accessory objects
  */
  async getAllAccessories(username: string) {
    const res = await fetch(`/api/accessories/${username}`);

    const data = await res.json();

    return data;
  }

  /*
  @param username
  @param accessoryType: ex) hat, shirt, etc
  @param accessoryName: ex) astronaut, cowboy, etc
  @returns Success or failure
  */
  async addAccessory(
    username: string,
    accessoryType: string,
    accessoryName: string
  ) {
    const input = {
      username,
      accessoryType,
      accessoryName,
    };

    const res = await fetch(`/api/accessories/`, {
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
  @param username
  @param accessoryType: ex) hat, shirt, etc
  @param accessoryName: ex) astronaut, cowboy, etc
  @returns Success or failure
  */
  async deleteAccessory(
    username: string,
    accessoryType: string,
    accessoryName: string
  ) {
    const input = {
      username,
      accessoryType,
      accessoryName,
    };

    const res = await fetch(`/api/accessories/`, {
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

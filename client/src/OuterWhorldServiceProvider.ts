import { Book } from '../../server/src/utils/Types';

// TODO: Remove book from cluster
// probably need to restructure the APIs (/api/clusters and /api/clusters/books)
class OuterWhorldServiceProvider {
  // Returns array of books
  async getBookInfo(bookTitle: string): Promise<Book[]> {
    const res = await fetch(`/api/book?bookTitle=${bookTitle}`);
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

    console.log(JSON.stringify(input));

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

  // Returns success or failure
  async addBookToCluster(clusterName: string, userName: string, book: Book) {
    const { title, pageCount, description } = book;

    const input = {
      clusterName,
      userName,
      bookTitle: title,
      pageCount,
      description,
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

  // Returns success or failure
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

  async getClusterInformation(clusterName: string, userName: string) {
    const res = await fetch(
      `/api/clusters?clusterName=${clusterName}&userName=${userName}`
    );
    const data = await res.json();

    return data;
  }
}

const OWServiceProvider = new OuterWhorldServiceProvider();

export default OWServiceProvider;

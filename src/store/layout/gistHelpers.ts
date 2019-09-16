import axios from "axios";
export const GH_GIST_API = "https://api.github.com/gists";
export async function gistUpdate(
  id: string,
  name: string,
  content: any,
  token: string
): Promise<boolean> {
  try {
    const contentString = JSON.stringify(content);
    const files = {} as any;
    files[`${name}.keeb.json`] = { content: contentString };
    var data = JSON.stringify({
      description: `Keeb Studio - ${name}`,
      public: false,
      files
    });
    axios.defaults.headers.common["authorization"] = `token ${token}`;
    const url = `${GH_GIST_API}/${id}`;
    const resp = await axios.patch(url, data);
    if (resp.status === 200) {
      return new Promise(resolve => {
        return resolve(true);
      });
    }
    return new Promise(resolve => {
      return resolve(false);
    });
  } catch (error) {
    return new Promise(resolve => {
      return resolve(false);
    });
  }
}

export async function gistCreate(
  name: string,
  content: any,
  token: string
): Promise<boolean | string> {
  try {
    const contentString = JSON.stringify(content);
    const files = {} as any;
    files[`${name}.keeb.json`] = { content: contentString };

    var data = JSON.stringify({
      description: `Keeb Studio - ${name}`,
      public: false,
      files
    });

    axios.defaults.headers.common["authorization"] = `token ${token}`;
    const resp = await axios.post(GH_GIST_API, data);
    if (resp.status === 201) {
      return new Promise(resolve => {
        return resolve(resp.data.id);
      });
    }
    return new Promise(resolve => {
      return resolve(false);
    });
  } catch (error) {
    return new Promise(resolve => {
      return resolve(false);
    });
  }
}

export async function gistExists(
  name: string,
  token: string
): Promise<boolean | string> {
  try {
    axios.defaults.headers.common["authorization"] = `token ${token}`;
    const resp = await axios.get(GH_GIST_API);
    let isFound = false;
    if (resp.status === 200) {
      const matching = resp.data.find(
        (gist: any) => gist.files[`${name}.keeb.json`] !== undefined
      );

      if (matching !== undefined) {
        isFound = matching.id;
      }
    }
    return new Promise(resolve => {
      return resolve(isFound);
    });
  } catch (error) {
    // console.log(error);
    return new Promise(resolve => {
      return resolve(false);
    });
  }
}

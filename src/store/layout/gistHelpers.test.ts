import aaxios from "axios";
import { gistCreate, gistExists, gistUpdate } from "./gistHelpers";
const axios = aaxios as any;

describe("actions", () => {
  let gh = "";
  beforeAll(() => {
    gh = process.env.CYPRESS_GHTOKEN || ("no_token" as string);
  });
  describe("gistUpdate", () => {
    beforeAll(() => {
      const RESP = { status: 200, data: mockResp[0] };
      axios.patch = jest.fn(x => {
        return Promise.resolve(RESP);
      });
    });
    it("returns true when successful", async () => {
      const result = await gistUpdate(
        "249185b2796fc4706fbdd567dc72e4b5",
        "board3",
        { name: "board3", content: { keys: [] } },
        gh
      );
      expect(result).toEqual(true);
    });
  });
  describe("gistCreate", () => {
    beforeAll(() => {
      const RESP = { status: 201, data: mockResp[0] };
      axios.post = jest.fn(x => {
        return Promise.resolve(RESP);
      });
    });
    it("returns the id when created", async () => {
      const result = await gistCreate(
        "board3",
        { name: "board3", content: { keys: [] } },
        gh
      );
      expect(result).toEqual("12f7e59c0f9420591d355649f62beb3f");
    });
  });
  describe("gistExists", () => {
    beforeAll(() => {
      const RESP = { status: 200, data: mockResp };
      axios.get = jest.fn(x => {
        return Promise.resolve(RESP);
      });
    });
    it("return id if found", async () => {
      const result = await gistExists("board", gh);
      expect(result).toEqual("12f7e59c0f9420591d355649f62beb3f");
    });
    it("return false if missing", async () => {
      const result = await gistExists("board2", gh);
      expect(result).toEqual(false);
    });
  });
});

const mockResp = [
  {
    url: "https://api.github.com/gists/1e4b1d0e53bd714207307eddcc451103",
    forks_url:
      "https://api.github.com/gists/1e4b1d0e53bd714207307eddcc451103/forks",
    commits_url:
      "https://api.github.com/gists/1e4b1d0e53bd714207307eddcc451103/commits",
    id: "12f7e59c0f9420591d355649f62beb3f",
    node_id: "MDQ6R2lzdDFlNGIxZDBlNTNiZDcxNDIwNzMwN2VkZGNjNDUxMTAz",
    git_pull_url:
      "https://gist.github.com/1e4b1d0e53bd714207307eddcc451103.git",
    git_push_url:
      "https://gist.github.com/1e4b1d0e53bd714207307eddcc451103.git",
    html_url: "https://gist.github.com/1e4b1d0e53bd714207307eddcc451103",
    files: {
      "board.keeb.json": {
        filename: "board.keeb.json",
        type: "application/json",
        language: "JSON",
        raw_url:
          "https://gist.githubusercontent.com/ctrlShiftBryan/1e4b1d0e53bd714207307eddcc451103/raw/8cebdce75edbe3f8634b944674c5fcfea1ace267/board.keeb.json",
        size: 10
      }
    },
    public: false,
    created_at: "2019-09-15T13:38:22Z",
    updated_at: "2019-09-15T13:40:12Z",
    description: "Keeb Studio - Board",
    comments: 0,
    user: null,
    comments_url:
      "https://api.github.com/gists/1e4b1d0e53bd714207307eddcc451103/comments",
    owner: {
      login: "ctrlShiftBryan",
      id: 798132,
      node_id: "MDQ6VXNlcjc5ODEzMg==",
      avatar_url: "https://avatars2.githubusercontent.com/u/798132?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/ctrlShiftBryan",
      html_url: "https://github.com/ctrlShiftBryan",
      followers_url: "https://api.github.com/users/ctrlShiftBryan/followers",
      following_url:
        "https://api.github.com/users/ctrlShiftBryan/following{/other_user}",
      gists_url: "https://api.github.com/users/ctrlShiftBryan/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/ctrlShiftBryan/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/ctrlShiftBryan/subscriptions",
      organizations_url: "https://api.github.com/users/ctrlShiftBryan/orgs",
      repos_url: "https://api.github.com/users/ctrlShiftBryan/repos",
      events_url:
        "https://api.github.com/users/ctrlShiftBryan/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/ctrlShiftBryan/received_events",
      type: "User",
      site_admin: false
    },
    truncated: false
  }
];

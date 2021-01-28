import { request } from '@octokit/request';

/**
 * @param {string}token
 * @param {string}org
 * @param {'private'|'public'}type
 * @param {number?}perPage
 * @param {number?}page
 * @return {Promise<OctokitResponse<any>>}
 */
export default async function getRepos({
  token,
  org,
  type,
  perPage = 0,
  page = 0,
}) {
  const resp = await request('GET /orgs/{org}/repos', {
    headers: {
      authorization: token,
    },
    org,
    type,
    per_page: perPage,
    page,
  });
  return resp ? resp.data : [];
}

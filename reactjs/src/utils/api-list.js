import { api } from './api.utils'

const tryCatch = async (cb) => {
    try {
        
        const { data } = await cb()

        return data

    } catch (e) {
        console.error(e)
        return {}
    } 
}

export const getTopNewsApi = async (page = 1, sources = undefined, category = undefined, personalize = true) => {
  return await tryCatch(
    async () =>
      await api().get("top_news", {
        params: {
          sources,
          category,
          page,
        },
      })
  );
};

export const postUserRegisterApi = async (data = {}) => {
    return await tryCatch(async () => await api().post('auth/register', data))
}

export const postUserLoginApi = async (data = {}) => {
    return await tryCatch(async () => await api().post('auth/login', data))
}

export const getUserProfileApi = async () => {
    return await tryCatch(async () => await api().get('user'))
}


export const postUpdateProfileFeed = async (data = {}) => {
    return await tryCatch(async () => await api().post('user', data))
}


export const getAvailableNewsOptions = async () => {
  return await tryCatch(async () => await api().get("available-news-options"));
}


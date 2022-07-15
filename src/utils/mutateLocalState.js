export const mutateLocalState = (queryClient, key, data) => {
  queryClient.cancelQueries(key)
  queryClient.setQueriesData(key, (prev) => {
    if (prev.data) {
      const newData = prev.data.map((current) => {
        return current._id === data._id ? data : current
      })
      return { ...prev, data: newData }
    }
    return prev
  })
}

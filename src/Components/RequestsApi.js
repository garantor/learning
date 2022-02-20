async function RequestsApi(url = "", reqType = null, errMsg = null) {
  try {
    const response = await fetch(url, reqType);
    if (!response.ok) throw Error("Please Reload the app");
  } catch (error) {
    errMsg = error.message;
  } finally {
    return errMsg;
  }
}

export default RequestsApi;

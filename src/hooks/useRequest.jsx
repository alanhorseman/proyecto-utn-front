import { useState } from "react"


function useRequest(){

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null)

  //reqCbFn = request Callback Function
  async function sendRequest(reqCbFn){
    try {
      setLoading(true);
      setError(null)
      const server_response = await reqCbFn()
      setResponse(server_response)

    } catch (error) {
      setError(error.message)
    } finally{
      setLoading(false)
    }
  }

  return {
    sendRequest,
    loading,
    response,
    error
  }
}

export default useRequest
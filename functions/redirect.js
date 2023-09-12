exports.handler = async (event) => {
    try {
      // Extract the requested path from the event object
      const { path } = event;
  
      // Define your redirection destination URL
      const redirectTo = `https://chat-server-cjy8.onrender.com${path}`;
  
      // Return a response with a 301 (Permanent Redirect) status code
      return {
        statusCode: 301,
        headers: {
          Location: redirectTo,
        },
        body: 'Redirecting...',
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  };
  
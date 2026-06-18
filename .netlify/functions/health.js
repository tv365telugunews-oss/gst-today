// Example Netlify function - Remove or customize as needed
// Deploy to: /.netlify/functions/health

export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'GST Admin Panel API is healthy',
      timestamp: new Date().toISOString(),
    }),
  }
}

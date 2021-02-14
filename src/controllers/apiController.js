export async function info(req, res) {
  return res.json({
    appName: 'API Skeleton Node',
    apiVersion: '0.1',
  });
}

export async function status(req, res) {
  return res.json({
    status: 'success',
  });
}

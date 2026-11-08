import { DatabaseSync } from 'node:sqlite';

async function handleGetUser(request, response) {
  const user = await findUser(request.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  response.json(user)
}

export { handleGetUser };
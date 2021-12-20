export async function fetchAsync(path) {
  const responce = await fetch(path);
  const data = await responce.json();

  return data;
}

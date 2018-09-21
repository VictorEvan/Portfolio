export async function getInitialData() {
  const response = await fetch('/api/projects');
  const json = await response.json();
  return json;
};

export async function saveContact(contact) {
  const response = await fetch('/api/contact', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(contact)
  });
  const json = await response.json();
  return json;
};
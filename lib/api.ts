export async function getProjects() {
  const res = await fetch(`/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getExperience() {
  const res = await fetch(`/api/experience`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function getEducation() {
  const res = await fetch(`/api/education`);
  if (!res.ok) throw new Error("Failed to fetch education");
  return res.json();
}

export async function getAbout() {
  const res = await fetch(`/api/about`);
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
}

export async function submitContact(data: { name: string, email: string, message: string }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to submit message");
  return res.json();
}
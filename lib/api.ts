const PORTFOLIO_ID = process.env.NEXT_PUBLIC_PORTFOLIO_ID;

export async function getProjects() {
  const res = await fetch(`/api/projects?portfolio=${PORTFOLIO_ID}`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getExperience() {
  const res = await fetch(`/api/experience?portfolio=${PORTFOLIO_ID}`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function getEducation() {
  const res = await fetch(`/api/education?portfolio=${PORTFOLIO_ID}`);
  if (!res.ok) throw new Error("Failed to fetch education");
  return res.json();
}

export async function getAbout() {
  const res = await fetch(`/api/about?portfolio=${PORTFOLIO_ID}`);
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
}
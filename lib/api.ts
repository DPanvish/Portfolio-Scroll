const API_URL = process.env.NEXT_PUBLIC_CMS_API_URL;
const PORTFOLIO_ID = process.env.NEXT_PUBLIC_PORTFOLIO_ID;

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects?portfolio=${PORTFOLIO_ID}`, {
    next: { revalidate: 60 } 
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getExperience() {
  const res = await fetch(`${API_URL}/experience?portfolio=${PORTFOLIO_ID}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function getEducation() {
  const res = await fetch(`${API_URL}/education?portfolio=${PORTFOLIO_ID}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error("Failed to fetch education");
  return res.json();
}

export async function getAbout() {
  const res = await fetch(`${API_URL}/about?portfolio=${PORTFOLIO_ID}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error("Failed to fetch about data");
  return res.json();
}
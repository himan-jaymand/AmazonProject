export function NotFound() {
  const notfound = document.createElement("div");
  notfound.classList = "notfound";
  notfound.innerHTML = `
 <div class="404">
     <h1>page was not found</h1>
 </div>
`;
  return notfound;
} 

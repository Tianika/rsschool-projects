const Footer = (): DocumentFragment => {
  const component = ` 
    <div class="container">
      <div class="copyright-year">&copy; 2021</div>
      <div class="copyright-author">
        <a href="https://github.com/Tianika" target="_blank">Tianika</a>
      </div>
     <div class="copyright-rsschool">
       <a href="https://rs.school/" target="_blank"></a>
     </div>
    </div>
  `;

  const fragment: DocumentFragment = document.createDocumentFragment();
  const footer: HTMLElement = document.createElement('footer');

  footer.classList.add('footer');
  footer.innerHTML = component;

  fragment.appendChild(footer);

  return fragment;
};

export default Footer;

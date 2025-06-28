const defaultTestimonials = [
    {
      name: "Tanya Sinclair",
      role: "UX Engineer",
      image: "profile1.jpg",
      text: "I’ve been interested in coding for a while but never taken the jump, until now. The bootcamp provided the perfect structure and support I needed to start my journey."
    },
    {
      name: "John Tarkpor",
      role: "Junior Front-end Developer",
      image: "profile2.jpg",
      text: "When I joined the bootcamp, I had no prior coding experience, and I was nervous about keeping up. But the bootcamp's hands-on approach, combined with clear explanations and mentorship, made all the difference."
    },
    {
      name: "Emily Carter",
      role: "Full Stack Developer",
      image: "profile3.jpg",
      text: "I had tried to learn coding on my own several times but kept hitting roadblocks. This bootcamp changed everything. The structured curriculum kept me focused, and the small class sizes meant I got plenty of individual attention."
    }
  ];
  
  
  let testimonials = JSON.parse(localStorage.getItem('testimonials')) || defaultTestimonials;
  
  const container = document.querySelector('.testimonial-container');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const addBtn=document.getElementById('add-btn');
  const shareForm=document.querySelector('.share-form');
  const form = document.getElementById('testimonialForm');

  const nameInput= document.getElementById('name');
  const roleInput= document.getElementById('role');
  const imageInput= document.getElementById('image');
  const textInput= document.getElementById('text');
  
  let currentIndex = 0;
  
  
 function renderTestimonials() {
  container.innerHTML = '';
  testimonials.forEach((t, index) => {
    const div = document.createElement('div');
    div.className = 'testimonial';
    const isUserAdded = index >= defaultTestimonials.length;
    div.innerHTML = `
      <div class="text">
        <p class="quote">“${t.text}”</p>
        <p class="author">
          <strong>${t.name}</strong> <span>${t.role}</span>
        </p>
        ${isUserAdded ? `<button class="delete-btn" data-index="${index}" title="Delete Testimonial">
          <i class="fas fa-trash"></i>
        </button>` : ''}
      </div>
      <img src="${t.image}" alt="${t.name}">
    `;
    container.appendChild(div);
  });

 
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
      const indexToDelete = parseInt(button.getAttribute('data-index'));
      const confirmed = confirm('Are you sure you want to delete this testimonial?');
      if (!confirmed) return;
      testimonials.splice(indexToDelete, 1);
      localStorage.setItem('testimonials', JSON.stringify(testimonials));
      if (currentIndex >= testimonials.length) currentIndex = testimonials.length - 1;
      if (currentIndex < 0) currentIndex = 0;
      renderTestimonials();
    });
  });

    updateSlider();
  }
  
  
  function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === testimonials.length - 1;
  }
  
  addBtn.addEventListener('click',()=>{
    if(shareForm.style.display==='none'){
        shareForm.style.display='block';
    }
    else{
        shareForm.style.display='none';
    }
  });

  
  prev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
  
  next.addEventListener('click', () => {
    if (currentIndex < testimonials.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });
  
  function clearErrorOnInput(inputElement, errorId) {
    inputElement.addEventListener('input', () => {
      document.getElementById(errorId).textContent = '';
    });
  }
  
  function clearErrorOnFileInput(inputElement, errorId) {
    inputElement.addEventListener('change', () => {
      document.getElementById(errorId).textContent = '';
    });
  }
  
  
  clearErrorOnInput(nameInput, 'name-error');
  clearErrorOnInput(roleInput, 'role-error');
  clearErrorOnInput(textInput, 'text-error');
  clearErrorOnFileInput(imageInput, 'image-error');

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

  const name = nameInput.value.trim();
  const role = roleInput.value.trim();
  const text = textInput.value.trim();
  const file = imageInput.files[0];
    
   
    let isValid=true;
    if(!name){
        document.getElementById('name-error').textContent="Name is required";
        isValid=false;
    }
    if(!role){
        document.getElementById('role-error').textContent="Role is required";
        isValid=false;
    }
    if(!file){
        document.getElementById('image-error').textContent="Please select an image file";
        isValid=false;
    }
    else{
    const allowedExtensions=['jpg','jpeg','png','gif'];
    const fileExtension=file.name.split('.').pop().toLowerCase();
    if(!allowedExtensions.includes(fileExtension)){
        document.getElementById('image-error').textContent='Only JPG,JPEG,PNG, and GIF files are allowed.';
       isValid=false;
    }
}

if(!text){
    document.getElementById('text-error').textContent="Testimonial is required";
    isValid=false;
}
if(!isValid) return;
    const newTestimonial = {
        name,
        role,
        image:file.name,
        text
      };
    testimonials.push(newTestimonial);
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    form.reset();
    renderTestimonials();
    currentIndex = testimonials.length - 1;
    updateSlider();
    shareForm.style.display = 'none';
  });
  
  
  renderTestimonials();

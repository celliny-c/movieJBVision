//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 2000;

// Fungsi untuk carousel
nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut;
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}

// FUNGSI BARU UNTUK YOUTUBE TRAILER
document.addEventListener('DOMContentLoaded', function() {
    const trailerButtons = document.querySelectorAll('.trailer-btn');
    const vidBoxes = document.querySelectorAll('.vid-box');
    
    // Inisialisasi - sembunyikan semua video box
    vidBoxes.forEach(box => {
        box.style.display = 'none';
    });
    
    // Event listener untuk setiap tombol trailer
    trailerButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah event bubbling
            
            const vidBox = vidBoxes[index];
            const iframe = vidBox.querySelector('.vid-trailer');
            const videoId = button.getAttribute('data-video-id');
            
            // Jika video sudah terbuka, tutup
            if (vidBox.style.display === 'block') {
                vidBox.style.display = 'none';
                // Stop video YouTube
                iframe.src = '';
            } else {
                // Tutup semua video lainnya
                vidBoxes.forEach((box, boxIndex) => {
                    if (boxIndex !== index) {
                        box.style.display = 'none';
                        const otherIframe = box.querySelector('.vid-trailer');
                        otherIframe.src = ''; // Stop video lainnya
                    }
                });
                
                // Set YouTube URL dan tampilkan
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                vidBox.style.display = 'block';
            }
        });
    });
    
    // Tutup video ketika klik di luar video
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.vid-box') && !e.target.closest('.trailer-btn')) {
            vidBoxes.forEach(box => {
                box.style.display = 'none';
                const iframe = box.querySelector('.vid-trailer');
                iframe.src = ''; // Stop video
            });
        }
    });
    
    // Tutup video ketika tekan ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            vidBoxes.forEach(box => {
                box.style.display = 'none';
                const iframe = box.querySelector('.vid-trailer');
                iframe.src = ''; // Stop video
            });
        }
    });
    
    // Update thumbnail content berdasarkan item aktif
    function updateThumbnailContent() {
        const activeItems = document.querySelectorAll('.carousel .list .item');
        const thumbnailItems = document.querySelectorAll('.carousel .thumbnail .item');
        
        thumbnailItems.forEach((thumb, index) => {
            const activeItem = activeItems[index];
            if (activeItem) {
                const title = activeItem.querySelector('h1').textContent;
                const details = activeItem.querySelector('.details').textContent;
                
                thumb.querySelector('.title').textContent = title;
                thumb.querySelector('.description').textContent = details;
            }
        });
    }
    
    // Panggil fungsi update setelah slider berubah
    const originalShowSlider = showSlider;
    showSlider = function(type) {
        originalShowSlider(type);
        setTimeout(updateThumbnailContent, timeRunning + 100);
    };
    
    // Inisialisasi pertama kali
    updateThumbnailContent();
});
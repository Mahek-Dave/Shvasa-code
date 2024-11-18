const updateTag = function(){
if(!window.innerWidth < 990) return;

const allBenefitImages = Array.from(document.querySelectorAll('.subscription-benefits-image-wrapper'));
const tagTitle = document.querySelector('[data-benefit-tag-title]');

const updateTagTitle = function(text){
    tagTitle.innerHTML = text;
}

const callback = (entries, observer) =>{
    entries.forEach((entry,i)=>{

        const index = Array.from(allBenefitImages).indexOf(entry.target)

        if(entry.isIntersecting){
            switch(index){
                case 0 : 
                updateTagTitle('YOGA');
                tagTitle.style.opacity = "100%"
                break;

                case 1 : 
                updateTagTitle('MEDITATION');
                break;

                case 2 : 
                updateTagTitle('STRENGTH TRAINING');
                break;

                case 3 : 
                updateTagTitle('DANCE FITNESS');
                break;

                default:
                updateTagTitle('YOGA');
            }
        }
    })
}

const options = {
    root : null,
    rootMargin : "-50%"
}

const observer = new IntersectionObserver(callback, options);

allBenefitImages.forEach(image=>{
    observer.observe(image);
})
}


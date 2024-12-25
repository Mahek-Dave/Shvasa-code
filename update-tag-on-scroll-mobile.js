/*

const updateTag = function(){
if(window.innerWidth > 990) return;

const allBenefitImages = Array.from(document.querySelectorAll('.subscription-benefits-image-wrapper'));
const tagTitle = document.querySelector('[data-benefit-tag-title]');
const tagTitleWrapper = document.querySelector('[data-tag-mob]');

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
                tagTitleWrapper.style.opacity = "100%"
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
    // rootMargin : "-60%"
    rootMargin : "-300px 0px 0px 0px"
    threshold: 1.0 
}

const observer = new IntersectionObserver(callback, options);

allBenefitImages.forEach(image=>{
    observer.observe(image);
})
}

updateTag()
*/

const updateTag = function() {
    if (window.matchMedia("(min-width: 990px)").matches) return;

    const allBenefitImages = Array.from(document.querySelectorAll('.subscription-benefits-image-wrapper'));
    const tagTitle = document.querySelector('[data-benefit-tag-title]');
    const tagTitleWrapper = document.querySelector('[data-tag-mob]');

    const updateTagTitle = function(text) {
        tagTitle.innerHTML = text;
    }

    const isElementInViewport = function(el) {
        const rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.top <= window.innerHeight * 0.55); // Element is 55% visible
    }

    const handleScroll = () => {
        allBenefitImages.forEach((image, index) => {
            if (isElementInViewport(image)) {
                switch (index) {
                    case 0:
                        updateTagTitle('YOGA');
                        tagTitleWrapper.style.opacity = "1";
                        break;
                    case 1:
                        updateTagTitle('MEDITATION');
                        break;
                    case 2:
                        updateTagTitle('STRENGTH TRAINING');
                        break;
                    case 3:
                        updateTagTitle('DANCE FITNESS');
                        break;
                    default:
                        updateTagTitle('YOGA');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Initial check in case elements are already in view on page load
    handleScroll();
}

updateTag();

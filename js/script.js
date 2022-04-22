document.addEventListener('DOMContentLoaded', function(){

const popupLinks= document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 1000;

if(popupLinks.length > 0){
	for(let i = 0; i < popupLinks.length; i++){
		const popupLink = popupLinks[i];
		popupLink.addEventListener("click", (e) => {
			e.preventDefault();
			const popupName =  popupLink.getAttribute("href").replace("#", "");
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
		})
	}
}

const popupCloseIcons = document.querySelectorAll(".popup-close");

	if(popupCloseIcons.length > 0){
		for(let i = 0; i < popupCloseIcons.length; i++){
			const el = popupCloseIcons[i];
			el.addEventListener("click", () => {
				popupClose(el.closest(".popup"))
			});
		}
	}

	function popupOpen(currentPopup){
		if(currentPopup && unlock){
			const popupActive = document.querySelector(".popup.open");
			if(popupActive){
				popupClose(popupActive, false);
			}else{
				bodyLock();
			}
			currentPopup.classList.add("open");
			currentPopup.addEventListener("click", (e)=>{
				if(!e.target.closest(".popup__content")){
					popupClose(e.target.closest(".popup "))
				}
			})
		}
	}

	function popupClose(popupActive, doUnlock = true){
		if(unlock){
			popupActive.classList.remove("open");
			if(doUnlock){
				bodyUnLock();
			}
		}
	}

	function bodyLock(){
		const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
		if(lockPadding.length > 0){
			for(let i = 0; i < lockPadding.length; i++){
				const el = lockPadding[i];
				el.style.paddingRight = lockPaddingValue;
			}
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add("lock");

		unlock = false;
		setTimeout(function (){
			unlock = true;
		}, timeout);
	}

	function bodyUnLock(){
		setTimeout(function(){
			if(lockPadding.length > 0){
				for(let i = 0; i < lockPadding.length; i++){
					const el = lockPadding[i];
					el.style.paddingRight = "0px";
				}
			}
			body.style.paddingRight = "0px";
			body.classList.remove("lock");
		}, timeout)

		unlock = false;
		setTimeout(function (){
			unlock = true;
		}, timeout);
	}

	document.addEventListener("keydown", (e) =>{
		if(e.which === 27){
			const popupActive = document.querySelector(".popup.open");
			popupClose(popupActive);
		}
	});

});

(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();


(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
	Element.prototype.matches = Element.prototype.matchesSelector ||
	Element.prototype.webkitMatchesSelector ||
	Element.prototype.mozMatchesSelector ||
	Element.prototype.msMatchesSelector;

  }

})();












































//**************************************************//
// Function for the room list presentation carousel //
//**************************************************//
$(function(){
	$('.slick-carousel').slick({
		infinite: true,
		slidesToShow: 3,		// Shows a three slides at a time
		slidesToScroll: 3,		// When you click an arrow, it scrolls 3 slides at a time	
		arrows: true,           // Adds arrows to sides of slider
		autoplay: false,         
     	autoplaySpeed: 2000     
	});
});
//*******************//
// End carousel list //
//*******************//
//******************************************//
// Function for header nav-bar and side-bar //
//******************************************//
$(document).ready(function(){
// cache DOM elements //
	let mainContent = $('.cd-main-content'),
		header = $('.cd-main-header'),
		sidebar = $('.cd-side-nav'),
		sidebarTrigger = $('.cd-nav-trigger'),
		topNavigation = $('.cd-top-nav'),
		searchForm = $('.cd-search')
// resize - move top nav position to window width //
	let resizing = false;
	moveNavigation();
	$(window).on('resize', function(){
		if( !resizing ) {
			(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
			resizing = true;
		}
	});
// window scroll - fix sidebar nav //
	let scrolling = false;
	checkScrollbarPosition();
	$(window).on('scroll', function(){
		if( !scrolling ) {
			(!window.requestAnimationFrame) ? setTimeout(checkScrollbarPosition, 300) : window.requestAnimationFrame(checkScrollbarPosition);
			scrolling = true;
		}
	});
// mobile - open sidebar when user click burger menu //
	sidebarTrigger.on('click', function(event){
		event.preventDefault();
		$([sidebar, sidebarTrigger]).toggleClass('nav-is-visible');
	});
// click on item and show submenu //
	$('.has-children > a').on('click', function(event){
		let mq = checkMQ(),
			selectedItem = $(this);
		if( mq == 'mobile' || mq == 'tablet' ) {
			event.preventDefault();
			if( selectedItem.parent('li').hasClass('selected')) {
				selectedItem.parent('li').removeClass('selected');
			} else {
				sidebar.find('.has-children.selected').removeClass('selected');
				selectedItem.parent('li').addClass('selected');
			}
		}
	});
// desktop - differentiate between user try to hover over a dropdown item VS try navigate into submenu's contents //
	sidebar.children('ul').menuAim({
        activate: function(row) {
        	$(row).addClass('hover');
        },
        deactivate: function(row) {
        	$(row).removeClass('hover');
        },
        exitMenu: function() {
        	sidebar.find('.hover').removeClass('hover');
        	return true;
        },
        submenuSelector: ".has-children",
    });
// check mobile or desktop //
	function checkMQ() {
		return window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	function moveNavigation(){
  		let mq = checkMQ();        
        if ( mq == 'mobile' && topNavigation.parents('.cd-side-nav').length == 0 ) {
        	detachElements();
			topNavigation.appendTo(sidebar);
		} else if ( ( mq == 'tablet' || mq == 'desktop') &&  topNavigation.parents('.cd-side-nav').length > 0 ) {
			detachElements();
			topNavigation.appendTo(header.find('.cd-nav'));
		}
		checkSelected(mq);
		resizing = false;
	}

	function detachElements() {
		topNavigation.detach();
	}

// desktop - remove select class from item select on mobile/tablet //
	function checkSelected(mq) {
		if( mq == 'desktop' ) $('.has-children.selected').removeClass('selected');
	}

	function checkScrollbarPosition() {
		let mq = checkMQ();		
		if( mq != 'mobile' ) {
			let sidebarHeight = sidebar.outerHeight(),
				windowHeight = $(window).height(),
				mainContentHeight = mainContent.outerHeight(),
				scrollTop = $(window).scrollTop();
			( ( scrollTop + windowHeight > sidebarHeight ) && ( mainContentHeight - sidebarHeight != 0 ) ) ? sidebar.addClass('is-fixed'): sidebar.removeClass('is-fixed').attr('style', '');
		}
		scrolling = false;
	}
});
//**********************************************//
// End function for header nav-bar and side-bar //
//**********************************************//
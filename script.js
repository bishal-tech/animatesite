const cursor = document.querySelector('.cursor');
const mainSec = document.querySelector('#main');

mainSec.addEventListener('mousemove', function (dets) {
    // console.log('hey')
    // console.log(dets.y)
    cursor.style.left = dets.x + 'px'
    cursor.style.top = dets.y + 'px'
})


function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

init()

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.page1 h1',
        scroller: '#main',
        markers: false,
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
})

tl.to(".page1 h1", {
    x: -250,
    // duration: 1,
}, 'anim')

tl.to(".page1 h2", {
    x: 200,
    // duration: 1,
}, 'anim')

tl.to(".page1 video", {
    width: "90%"
}, 'anim')


const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: '.page1',
        scroller: '#main',
        markers: false,
        start: "top -80%",
        end: "top -110%",
        scrub: 3
    }
})

tl2.to("#main", {
    backgroundColor: "#fff",
    color: "#000"
}, 'anim2')
tl2.to(".page2 h1", {
    x: 300
}, 'anim2')
tl2.to(".cursor", {
    backgroundColor: '#000',
}, 'anim2')
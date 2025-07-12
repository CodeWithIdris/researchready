    const servicesSlider = document.getElementById("servicesSlider");
    const serviceSlideWidth = 324;
    let serviceScroll = 0;
  
    function scrollServices(direction) {
      serviceScroll += direction * serviceSlideWidth;
      if (serviceScroll < 0) serviceScroll = 0;
      if (serviceScroll > servicesSlider.scrollWidth - servicesSlider.clientWidth) {
        serviceScroll = servicesSlider.scrollWidth - servicesSlider.clientWidth;
      }
      servicesSlider.scrollTo({ left: serviceScroll, behavior: "smooth" });
    }
  
    setInterval(() => {
      serviceScroll += serviceSlideWidth;
      if (serviceScroll >= servicesSlider.scrollWidth - servicesSlider.clientWidth) {
        serviceScroll = 0;
      }
      servicesSlider.scrollTo({ left: serviceScroll, behavior: "smooth" });
    }, 4000);

    
    

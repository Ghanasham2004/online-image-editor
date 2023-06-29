const fileInput = document.querySelector(".file-input"),
  PreviewImage = document.querySelector(".preview-img img"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  filterOptions = document.querySelectorAll(".filter button"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  chooseImage = document.querySelector(".choose-img"),
  saveImageBtn = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  PreviewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} ,${flipVertical})`;
  PreviewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  //   PreviewImage.style.filter = `brightness(${brightness}%) saturation(${saturation}%) inversion(${inversion}%) grayscale(${grayscale}%)`;
};
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  //   console.log(file);
  PreviewImage.src = URL.createObjectURL(file);
  PreviewImage.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerHTML;
    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  console.log(filterSlider.value);
  filterValue.innerHTML = filterSlider.value + "%";
  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else if (selectedFilter.id === "grayscale") {
    grayscale = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});
const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilters();
};
const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = PreviewImage.naturalWidth;
  canvas.height = PreviewImage.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    PreviewImage,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  //   document.body.appendChild(canvas);
  const link = document.createElement("a");
  link.download = "e-smart-editor.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
chooseImage.addEventListener("click", () => fileInput.click());

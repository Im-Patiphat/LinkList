let carriageCount = 0;
let dragged;

document.addEventListener("DOMContentLoaded", (event) => {
  const train = document.getElementById("train");
  const countDisplay = document.querySelector(".count");

  // สร้างฟังก์ชันเพิ่มโบกี้ใหม่
  window.addCarriage = function () {
    if (carriageCount < 15) {
      carriageCount++;
      const newCarriage = document.createElement("div");
      newCarriage.className = "carriage";
      newCarriage.setAttribute("draggable", true);
      newCarriage.id = "carriage" + carriageCount;
      newCarriage.textContent = "โบกี้ " + carriageCount;
      train.appendChild(newCarriage);
      addDragEvents(newCarriage);
      updateCountDisplay();
    }
  };

  // สร้างฟังก์ชันเพิ่มโบกี้ใหม่
  window.addcountCarriage = function () {
    if (carriageCount < 15) {
      carriageCount++;
      const newCarriage = document.createElement(".countCarriage");
      newCarriage.className = "carriage";
      newCarriage.setAttribute("draggable", true);
      newCarriage.id = "carriage" + carriageCount;
      newCarriage.textContent = "โบกี้ " + carriageCount;
      train.appendChild(newCarriage);
      addDragEvents(newCarriage);
      updateCountDisplay();
    }
  };

  const addDragEvents = (item) => {
    item.addEventListener("dragstart", (e) => {
      dragged = item;

      // Check if the dragged element is the first or last child
      if (
        dragged === train.firstElementChild ||
        dragged === train.lastElementChild
      ) {
        e.preventDefault(); // Prevent dragging for first and last child
      } else {
        e.dataTransfer.setData("text/plain", item.id);
      }
    });
  };

  // จัดการกับการลากและวาง
  train.addEventListener("dragover", (e) => {
    e.preventDefault(); // อนุญาตให้วาง
  });

  train.addEventListener("drop", (e) => {
    e.preventDefault();
    if (
      dragged &&
      e.target.className === "carriage" &&
      !e.target.isEqualNode(dragged)
    ) {
      // Check if it's not the first or last child
      if (
        !(
          e.target === train.firstElementChild ||
          e.target === train.lastElementChild
        )
      ) {
        const afterElement = getDragAfterElement(train, e.clientX);
        if (afterElement == null) {
          train.appendChild(dragged);
        } else {
          train.insertBefore(dragged, afterElement);
        }
      }
    }
  });

  // ฟังก์ชันหาโบกี้ที่ควรจะวางโบกี้ที่ลากมาต่อหน้าหรือหลัง
  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".carriage:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  // อัปเดตการแสดงผลของ count
  function updateCountDisplay() {
    countDisplay.textContent = carriageCount.toString();
  }
});

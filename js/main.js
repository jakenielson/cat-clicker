var model = {
  // Currently selected cat
  currentCat: null,

  // Admin mode toggle
  admin: false,

  // List of cats
  cats: [
    {'name': 'Buttons', 'src': 'img/buttons.jpg', 'count': 0},
    {'name': 'Boots', 'src': 'img/boots.jpg', 'count': 0},
    {'name': 'Beans', 'src': 'img/beans.jpg', 'count': 0},
    {'name': 'Blue', 'src': 'img/blue.jpg', 'count': 0},
    {'name': 'Belle', 'src': 'img/belle.jpg', 'count': 0}
  ]
};

var octopus = {
  init: function() {
    // Set current cat to first cat
    model.currentCat = model.cats[0];
    //Initialize the views
    catView.init();
    catListView.init();
    adminView.init();
  },

  getCats: function() {
    return model.cats;
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
    this.disableAdmin();
    catView.render();
    adminView.render();
  },

  getCount: function() {
    return model.currentCat.count;
  },

  incrementCount: function() {
    model.currentCat.count++;
    catView.render();
  },

  toggleAdmin: function() {
    if (model.admin) {model.admin = false;}
    else {model.admin = true;}
    adminView.render(model.admin);
  },

  disableAdmin: function() {
    model.admin = false;
  },

  saveAdminInput: function(name, src, clicks) {
    model.currentCat.name = name;
    model.currentCat.src = src;
    model.currentCat.count = clicks;
    catView.render();
  }
};

var catView = {
  init: function() {
    this.cat = document.getElementById('cat-img');
    this.catName = document.getElementById('cat-name');
    this.counter = document.getElementById('click-count');

    // Add event listener to cat image
    this.cat.addEventListener('click', function(){
      octopus.incrementCount();
    }, null);

    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.cat.setAttribute("src", currentCat.src);
    this.catName.innerText = currentCat.name;
    this.counter.innerText = currentCat.count;
  }
};

var catListView = {
  init: function() {
    this.catList = document.getElementById('cat-list');
    this.render();
  },

  render: function() {
    var node, anchor, textnode;
    var cats = octopus.getCats();
    // Clear list
    this.catList.innerHTML = '';
    // Populate list
    cats.forEach(function(cat){
      // Create list item
      node = document.createElement("li");
      anchor = document.createElement("a");
      anchor.className = "listed-cat";
      textnode = document.createTextNode(cat.name);
      anchor.appendChild(textnode);
      node.appendChild(anchor);
      // Add list item
      catListView.catList.appendChild(node);
      // Add event listener to item
      node.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
        };
      })(cat));
    });

  }
}

var adminView = {
  init: function() {
    this.adminFields = document.getElementById("admin-fields");
    this.adminButton = document.getElementById("admin-button");

    // Add event listener to admin buttons
    this.adminButton.addEventListener('click', function(){
      octopus.toggleAdmin();
    }, null);
  },

  render: function(admin) {
    if (admin) {
      var node, textArea, save;
      var currentCat = octopus.getCurrentCat();

      // Name form
      node = document.createElement("p");
      textArea = document.createElement("textarea");
      textArea.setAttribute("ID", "name-field");
      node.innerText = "Name: ";
      textArea.innerText = currentCat.name;
      node.appendChild(textArea);
      this.adminFields.appendChild(node);

      // SRC form
      node = document.createElement("p");
      textArea = document.createElement("textarea");
      textArea.setAttribute("ID", "src-field");
      node.innerText = "SRC: ";
      textArea.innerText = currentCat.src;
      node.appendChild(textArea);
      this.adminFields.appendChild(node);

      // Clicks form
      node = document.createElement("p");
      textArea = document.createElement("textarea");
      textArea.setAttribute("ID", "clicks-field");
      node.innerText = "Clicks: ";
      textArea.innerText = currentCat.count;
      node.appendChild(textArea);
      this.adminFields.appendChild(node);

      // Save buttons
      save = document.createElement("p");
      save.innerText = "Save";
      this.adminFields.appendChild(save);
      save.addEventListener('click', function(){
        var name = document.getElementById("name-field").value;
        var src = document.getElementById("src-field").value;
        var clicks = document.getElementById("clicks-field").value;
        octopus.saveAdminInput(name, src, clicks);
      }, null);
    }
    else {
      this.adminFields.innerHTML = '';
    }
  }
}

octopus.init();

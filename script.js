class Node {
  constructor(value, left = null, right = null) {
    this._value = value;
    this.left = left;
    this.right = right;
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
  }
}
class BinarySearchTree {
  constructor(array) {
    this.root = this.buildTree(this.sortArray(array));
  }
  buildTree(array) {
    // Checks if is the end
    if (array.length === 0) return null;

    // Create node in the middle and divides array
    let mid = Math.ceil((array.length - 1) / 2);
    let root = new Node(array[mid]);
    let leftSubArray = array.slice(0, mid);
    let rightSubArray = array.slice(mid + 1, array.length);

    // Repeat
    root.left = this.buildTree(leftSubArray);
    root.right = this.buildTree(rightSubArray);
    return root;
  }
  insert(value) {
    const node = this.root;
    if (this.root === null) {
      // If new tree
      this.root = new Node(value);
      return;
    } else {
      const searchTree = (node) => {
        if (value < node.value) {
          // For left
          if (node.left === null) {
            node.left = new Node(value);
            return;
          } else return searchTree(node.left);
        } else if (value > node.value) {
          // For right
          if (node.right === null) {
            node.right = new Node(value);
            return;
          } else return searchTree(node.right);
        } else return null;
      };
      return searchTree(node);
    }
  }
  deleteItem(value) {
    const deleteNode = (node, value) => {
      if (node === null) return null;
      if (value === node.value) {
        if (node.left == null && node.right == null) return null;
        if (node.left == null) return node.right;
        if (node.right == null) return node.left;
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.value = tempNode.value;
        node.right = deleteNode(node.right, tempNode.value);
        return node;
      } else if (value < node.value) {
        node.left = deleteNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = deleteNode(node.right, value);
        return node;
      }
    };
    this.root = deleteNode(this.root, value);
  }
  find(value) {
    const findNode = (node, value) => {
      if (node.value === value) return node;
      else if (value < node.value) return findNode(node.left, value);
      else if (value > node.value) return findNode(node.right, value);
      else return null;
    };
    return findNode(this.root, value);
  }
  levelOrder(callback) {
    let result = [];
    const traverseLevelOrder = (node) => {
      if (node === null) return null;
      let queue = [];
      queue.push(node);
      while (queue.length != 0) {
        let currentNode = queue[0];
        // Actions to Node
        if (callback) callback(currentNode);
        result.push(currentNode.value);
        // Putting next nodes un queue
        if (currentNode.left != null) queue.push(currentNode.left);
        if (currentNode.right != null) queue.push(currentNode.right);
        queue.shift();
      }
    };
    traverseLevelOrder(this.root);
    if (!callback) return result;
  }
  inOrder(callback) {
    let result = [];
    const traverseInOrder = (node) => {
      if (node === null) return null;
      traverseInOrder(node.left);
      if (callback) callback(node.value);
      result.push(node.value);
      traverseInOrder(node.right);
    };
    traverseInOrder(this.root);
    if (!callback) return result;
  }
  postOrder(callback) {
    let result = [];
    const traversePostOrder = (node) => {
      if (node === null) return null;
      traversePostOrder(node.left);
      traversePostOrder(node.right);
      result.push(node.value);
      if (callback) callback(node.value);
    };
    traversePostOrder(this.root);
    if (!callback) return result;
  }
  preOrder(callback) {
    let result = [];
    const traversePreOrder = (node) => {
      if (node === null) return null;
      if (callback) callback(node.value);
      result.push(node.value);
      traversePreOrder(node.left);
      traversePreOrder(node.right);
    };
    traversePreOrder(this.root);
    if (!callback) return result;
  }
  height(node = this.root) {
    if (node === null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(value) {
    const findDepth = (node, value, depth) => {
      if (node === null) return -1;
      if (node.value === value) return depth;
      else if (node.value > value)
        return findDepth(node.left, value, depth + 1);
      else return findDepth(node.right, value, depth + 1);
    };

    return findDepth(this.root, value, 0);
  }
  isBalanced() {
    const balanced = (node) => {
      if (node === null) return true;
      let leftHeight = this.height(node.left);
      let rightHeight = this.height(node.right);
      if(Math.abs(leftHeight - rightHeight) <= 1 && balanced(node.left) && balanced(node.right))
        return true;
      return false;
    };
    return balanced(this.root);
  }
  rebalance() {
    let array = [];
    this.levelOrder(
      (node) => {
        array.push(node.value);
      }
    );
    this.root = this.buildTree(this.sortArray(array));
  }

  // Utils
  sortArray(array) {
    return array
      .filter((element, index) => array.indexOf(element) === index)
      .sort((a, b) => a - b);
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

console.log("======CREATE AND INSERT=====");
let myTree = new BinarySearchTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
function callbackFunction(node) {
  console.log(node);
}
myTree.insert(6);
myTree.prettyPrint();
console.log("======DELETE======");
myTree.deleteItem(4);
myTree.prettyPrint();
console.log("======FIND======");
console.log(`Node Found:`);
console.log(myTree.find(5));
console.log("======LEVEL ORDER======");
console.log(myTree.levelOrder());
console.log("======IN ORDER======");
console.log(myTree.inOrder());
console.log("======POST ORDER======");
console.log(myTree.postOrder());
console.log("======PRE ORDER======");
console.log(myTree.preOrder());
console.log("======HEIGHT======");
console.log(myTree.height(myTree.find(7)));
console.log("======DEPTH======");
console.log(`Depth of 7: ${myTree.depth(7)}`);
console.log(`Depth of 5: ${myTree.depth(5)}`);
console.log(`Depth of 324: ${myTree.depth(324)}`);
console.log(`Depth of root: ${myTree.depth(8)}`);
console.log("======IS BALANCED======");
console.log(`Is tree balanced? ${myTree.isBalanced()}`);
myTree.insert(1001);
myTree.insert(2002);
myTree.insert(3003);
myTree.insert(4004);
myTree.prettyPrint();
console.log(`Is tree balanced? ${myTree.isBalanced()}`);
myTree.rebalance();
myTree.prettyPrint();
console.log(`Is tree balanced? ${myTree.isBalanced()}`);



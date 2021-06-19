const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(arr = [[]]) {
        this.arr = arr;
        this.x_axis = 0;
        this.y_axis = 0;
        // Initialization of the character's position
        this.arr[0][0] = pathCharacter;
    }
    
    Run() {
        let playing = true;
        while (playing) {
            this.print();
            this.changeDirection();
            if (!this.Bound()) { 
                console.log('Illegal direction');                
                playing = false;
                break;
            } else if (this.ishole()) {
                console.log('You fell down a hole! Game Over!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log(`You've found your hat! Congrats!`);
                playing = false;
                break;
            }
            this.arr[this.y_axis][this.x_axis] = pathCharacter;
        }
        // Updating the current location on the map
        
    }


    changeDirection() {
        const direction = prompt('Which direction? ').toUpperCase();
        switch (direction) {
            case 'U':
                this.y_axis -= 1;
                break;
            case 'D':
                this.y_axis += 1;
                break;
            case 'L':
                this.x_axis -= 1;
                break;
            case 'R':
                this.x_axis += 1;
                break;
            default:
                console.log('Unknown direction');
                this.changeDirection();
                break;
        }
        
    }

    print() {
        const display = this.arr.map (row => {
            return row.join('');
        }).join('\n');
        console.log(display);
    }
    isHat() {
        return this.arr[this.y_axis][this.x_axis] === hat;
    }
    ishole() {
        return this.arr[this.y_axis][this.x_axis] === hole;
    }

    Bound() {
        return (
            this.y_axis >= 0 &&
            this.x_axis >= 0 &&
            this.y_axis < this.arr.length &&
            this.x_axis < this.arr[0].length
        );
    }

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }
        // Set the "hat" location
        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        // Make sure the "hat" is not at the starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
          hatLocation.x = Math.floor(Math.random() * width);
          hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
      }
}
    

// console.log('Your Current Field\n');

// const myField = new Field([  
//     ['*', '░', 'O'],
//     ['░', 'O', '░'],
//     ['░', '^', '░'],]);

// myField.print();


const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.Run();

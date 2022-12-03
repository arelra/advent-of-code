const input = await Deno.readTextFile("./input.txt");

const maxCalories = input.split('\n\n').reduce((max, food) => {
    const calories = food.split('\n').map(Number).reduce((sum, i) => sum + i, 0);
    return calories > max ? calories : max;
}, 0);

console.log(maxCalories);
export const GetMinAmountToIncreasePoints = (points, last_points, increase) =>
    Number(points) >= increase * Number(last_points)
        ? 0
        : (increase * Number(last_points) - Number(points) + 0.01).toFixed(4);

export function map(val, start1, end1, start2, end2) {
    return (val - start1) / (end1 - start1) * (end2 - start2) + start2;
}
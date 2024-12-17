export function snakeCaseToString(input: string): string {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function capitalizeFirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export class TransformHelper {
  public static trim({ value }) {
    return value ? value.trim() : value;
  }

  public static toUpperCase({ value }) {
    return value ? value.toUpperCase() : value;
  }

  public static trimArray({ value }) {
    return value && Array.isArray(value)
      ? value.map((item) => item.trim())
      : value;
  }

  public static uniqueArrayItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }
}

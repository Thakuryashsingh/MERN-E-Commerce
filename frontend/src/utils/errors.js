export function errorMessage(error, fallback = 'Something went wrong. Please try again.') {
  return error.response?.data?.message || error.message || fallback;
}
export function fieldErrors(error) {
  return error.response?.data?.errors || [];
}

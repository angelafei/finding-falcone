export function createAction(type, payload) {
  return { type, payload };
}

export function createActionWithPayload(type, payload) {
  if (payload) {
    return createAction(type, payload);
  } else {
    return curriedPayload => createAction(type, curriedPayload);
  }
}
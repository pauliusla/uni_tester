export const users = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const data = {
    id: 1,
    name: "XXX",
    lastName: "XXX",
    email: "XXX@XXXX.com",
    city: "XXX",
    address: "XXXX",
    country: "XXXXX",
    isAdmin: false,
  };

  return [data];
};

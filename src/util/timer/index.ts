const cooldowns: { [key: string]: number } = {};

export const onCooldown = (key: string): boolean => {
  return cooldowns[key] != undefined && cooldowns[key] >= Date.now();
};

export const resetCooldown = (key: string) => {
  cooldowns[key] = Date.now() + 1000*60*60*2;
};

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
const reflect = new Reflector();

export const createDecorator = (
  decoratorKey: string,
  options: any,
): MethodDecorator => {
  return (_, d__, descriptor: PropertyDescriptor) => {
    SetMetadata(decoratorKey, options)(descriptor.value);
  };
};

export const getDecoratorValue = (decoratorKey: string, target: any) =>
  reflect.get(decoratorKey, target);

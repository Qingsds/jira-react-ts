import { useArray } from "./useArray";

interface Person {
  name: string;
  age: number;
}

export const TsReactTest = () => {
  const persons: Person[] = [
    { name: "jack", age: 12 },
    { name: "ma", age: 12 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);

/*   useEffect(() => {
    console.log(value.notExist);
    add({ name: "string" });
    removeIndex("123");
  }, []); */
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 18 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person, index) => (
        <div>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};

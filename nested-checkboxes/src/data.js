export const initalData = [
  {
    id: 1,
    isChecked: false,
    name: "Parent 1",
    children: [
      {
        id: 2,
        isChecked: false,
        name: "child 1.1",
        children: [
          { id: 3, isChecked: false, name: "child 1.1.1" },
          { id: 4, isChecked: false, name: "child 1.1.2" },
        ],
      },
      {
        id: 10,
        name: "child 1.2",
        isChecked: false,
      },
    ],
  },
  {
    id: 5,
    isChecked: false,
    name: "Parent 2",
    children: [
      {
        id: 6,
        isChecked: false,
        name: "child 2.1",
        children: [{ id: 7, isChecked: false, name: "child 2.1.1" }],
      },
    ],
  },
];

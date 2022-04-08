import validatorCard from "@/views/validatorCard";
import { render, fireEvent, getByTestId } from "@testing-library/vue";
describe("Testing Vue", () => {
  test("render validatorCard", () => {
    const { debug } = render(validatorCard);
    debug();
    const input = getByTestId("inputCardNumber");
    fireEvent.update(input, "1111222233334444");
  });
});

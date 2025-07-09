"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlainRecipe from "./components/dashboard/plainrecipecard";

export default function Home() {
  const imgContainerRef = useRef(null);
  const maxTilt = 10

  const[isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const cookieStr = document.cookie;
    const token = cookieStr
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    setIsLoggedIn(!!token);
  }, [])

  const handleMouseMove = (e) => {
      const container = imgContainerRef.current;
      const { width, height, left, top } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const rotateY = ((x - width / 2) / (width / 2)) * -maxTilt;
      const rotateX = ((y - height / 2) / (height / 2)) * maxTilt;

      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
      const container = imgContainerRef.current;
      container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="bg-[#edede9] w-[100%] border h-screen overflow-y-auto">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      <div className="flex flex-col justify-center items-center mb-202">
        <div className="w-4/5 flex justify-between items-center mt-10 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] z-10 rounded-2xl py-4">
          <div className="items-center space-x-2 pl-3 flex">
            <h1 className="font-bold text-xl md:text-3xl">Plate Pages</h1>
            <Image
            className="invisible sm:visible"
              src={"/assets/icon/plate.svg"}
              alt="icon"
              width={50}
              height={50}
            />
          </div>
          {isLoggedIn ? (
          <div className="relative transition-transform duration-300 ease-in-out hover:scale-105 group py-3 md:scale-100 scale-70">
              <div className="absolute inset-0 rounded-3xl blur-sm group-hover:opacity-100 bg-[#fd3df4] sm:mr-10"></div>
              <a href="/dashboard" className="relative bg-gradient-to-r from-blue-400 to-purple-700 rounded-3xl px-5 sm:px-15 py-4 group-hover:cursor-pointer sm:mr-10 font-bold text-xl text-white">Dashboard</a>
          </div>
          ) : (
          <div className="relative transition-transform duration-300 ease-in-out hover:scale-105 group py-3 md:scale-100 scale-70">
              <div className="absolute inset-0 rounded-3xl blur-sm group-hover:opacity-100 bg-[#fd3df4] sm:mr-10"></div>
              <a href="/auth/signup" className="relative bg-gradient-to-r from-blue-400 to-purple-700 rounded-3xl px-5 sm:px-15 py-4 group-hover:cursor-pointer sm:mr-10 font-bold text-xl text-white">Sign Up</a>
          </div>
          )}

        </div>
        <div className="mt-30 flex flex-col lg:flex-row justify-center">
          <div className="w-[100%] lg:w-1/3 flex flex-col">
            <h1 className="text-7xl max-w-[100%] lg:max-w-[70%] text-center lg:text-start mb-10 lg:mb-0 xl:ml-4">The <p className="bg-purple-400 inline-flex p-2 rounded-2xl text-white font-bold">perfect</p> recipe sharing site</h1>
            <hr className="w-[50%] border-2 invisible lg:visible lg:my-2"></hr>
            <p className="text-xl mt-2 text-center lg:text-start max-w-[100%] lg:max-w-[70%] xl:ml-4 mb-3 lg:mb-0">Perfect for creating and sharing your recipes all 100% free of charge</p>
          </div>
          <div
            ref={imgContainerRef}
            className="rounded-md border w-fit h-fit flex transition-transform duration-600 ease-out hover:scale-115"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              className="rounded-md"
              src="/assets/img/ai.png"
              alt="image"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="w-[100%] mt-20">
        <div className="overflow-hidden flex">
          <ul className="flex gap-10 text-white py-10 -my-5 infinite-scroll ">
            <PlainRecipe title="Spaghetti Bolognese" desc="A rich Italian meat sauce simmered with tomatoes and herbs, served over spaghetti." mins={60} />
            <PlainRecipe title="Chicken Tikka Masala" desc="Tender chunks of chicken in a creamy tomato-based curry, spiced to perfection." mins={50} />
            <PlainRecipe title="Beef Tacos" desc="Crispy shells filled with seasoned beef, fresh lettuce, cheese, and salsa." mins={30} />
            <PlainRecipe title="Vegetable Stir-Fry" desc="A colorful mix of veggies tossed in a savory soy-garlic sauce." mins={20} />
            <PlainRecipe title="Margherita Pizza" desc="Classic pizza topped with fresh mozzarella, tomatoes, and basil." mins={25} />
            <PlainRecipe title="Shrimp Pad Thai" desc="Rice noodles stir-fried with shrimp, peanuts, bean sprouts, and tamarind sauce." mins={35} />
            <PlainRecipe title="French Onion Soup" desc="Caramelized onions in a rich broth topped with crusty bread and melted cheese." mins={90} />
            <PlainRecipe title="Grilled Salmon" desc="Juicy salmon fillets grilled with lemon, garlic, and herbs." mins={25} />
            <PlainRecipe title="Mushroom Risotto" desc="Creamy arborio rice cooked slowly with mushrooms and Parmesan." mins={40} />
            <PlainRecipe title="Chicken Caesar Salad" desc="Crisp romaine lettuce tossed with Caesar dressing, croutons, and grilled chicken." mins={15} />
            <PlainRecipe title="Pulled Pork Sandwiches" desc="Slow-cooked pork shoulder shredded and served with BBQ sauce on buns." mins={480} />
            <PlainRecipe title="Egg Fried Rice" desc="Fluffy rice stir-fried with eggs, peas, carrots, and green onions." mins={20} />
            <PlainRecipe title="Beef Stroganoff" desc="Sautéed strips of beef and mushrooms in a creamy sauce over egg noodles." mins={45} />
            <PlainRecipe title="Greek Salad" desc="A refreshing salad of cucumbers, tomatoes, olives, feta, and olive oil." mins={15} />
            <PlainRecipe title="Chocolate Chip Cookies" desc="Classic chewy cookies loaded with semisweet chocolate chips." mins={25} />
            <PlainRecipe title="Lentil Soup" desc="Hearty soup made with lentils, vegetables, and warming spices." mins={60} />
            <PlainRecipe title="Fish and Chips" desc="Crispy battered fish served with golden fries and tartar sauce." mins={45} />
            <PlainRecipe title="Beef Burger" desc="Juicy beef patty with cheese, lettuce, tomato, and special sauce in a bun." mins={30} />
            <PlainRecipe title="Pancakes" desc="Fluffy pancakes served with maple syrup and butter." mins={20} />
            <PlainRecipe title="Ratatouille" desc="A stewed vegetable dish with eggplant, zucchini, peppers, and tomatoes." mins={70} />
            <PlainRecipe title="Chicken Noodle Soup" desc="Comforting broth with chicken, noodles, and vegetables." mins={45} />
            <PlainRecipe title="Quiche Lorraine" desc="Savory tart filled with bacon, cheese, and rich egg custard." mins={60} />
            <PlainRecipe title="Shrimp Scampi" desc="Succulent shrimp sautéed in garlic butter and white wine, served over pasta." mins={25} />
            <PlainRecipe title="Caprese Salad" desc="Slices of tomato, fresh mozzarella, and basil drizzled with olive oil." mins={10} />
            <PlainRecipe title="Thai Green Curry" desc="A spicy coconut curry with chicken, vegetables, and fragrant herbs." mins={40} />
            <PlainRecipe title="BBQ Ribs" desc="Tender pork ribs slow-cooked in tangy barbecue sauce." mins={360} />
            <PlainRecipe title="Avocado Toast" desc="Mashed avocado on toasted bread, topped with salt, pepper, and chili flakes." mins={10} />
            <PlainRecipe title="Shepherd's Pie" desc="Ground lamb and veggies topped with creamy mashed potatoes and baked." mins={90} />
            <PlainRecipe title="Falafel Wrap" desc="Crispy chickpea patties wrapped in flatbread with salad and tahini." mins={30} />
            <PlainRecipe title="Chocolate Brownies" desc="Fudgy chocolate squares with a crackly top." mins={35} />
            <PlainRecipe title="Minestrone Soup" desc="Vegetable and bean soup in a tomato broth with pasta." mins={50} />
            <PlainRecipe title="Chicken Fajitas" desc="Sizzling strips of chicken with peppers and onions in tortillas." mins={30} />
            <PlainRecipe title="Pesto Pasta" desc="Pasta tossed with fresh basil pesto, pine nuts, and Parmesan." mins={20} />
            <PlainRecipe title="Beef Wellington" desc="Tender beef fillet wrapped in puff pastry with mushroom duxelles." mins={180} />
            <PlainRecipe title="Vegetable Curry" desc="Mixed vegetables simmered in a spiced coconut sauce." mins={45} />
            <PlainRecipe title="Tuna Salad" desc="Flaked tuna mixed with mayo, celery, and onion, perfect for sandwiches." mins={15} />
            <PlainRecipe title="Lasagna" desc="Layered pasta with meat sauce, ricotta, and melted cheese." mins={90} />
            <PlainRecipe title="Cobb Salad" desc="A hearty salad with chicken, bacon, eggs, avocado, and blue cheese." mins={25} />
            <PlainRecipe title="French Toast" desc="Brioche soaked in egg mixture and pan-fried, served with syrup." mins={20} />
            <PlainRecipe title="Beef Chili" desc="Spicy beef and bean chili topped with cheese and sour cream." mins={120} />
            <PlainRecipe title="Eggplant Parmesan" desc="Breaded eggplant layered with marinara and mozzarella, baked." mins={60} />
            <PlainRecipe title="BLT Sandwich" desc="Bacon, lettuce, and tomato with mayo on toasted bread." mins={10} />
            <PlainRecipe title="Chicken Alfredo" desc="Pasta in a creamy Alfredo sauce with grilled chicken." mins={25} />
            <PlainRecipe title="Stuffed Peppers" desc="Bell peppers filled with seasoned rice and ground meat, baked." mins={60} />
            <PlainRecipe title="Clam Chowder" desc="Creamy soup with clams, potatoes, and onions." mins={50} />
            <PlainRecipe title="Vegetable Lasagna" desc="Layered pasta with mixed vegetables, ricotta, and tomato sauce." mins={80} />
            <PlainRecipe title="Greek Moussaka" desc="Layered eggplant and spiced meat topped with béchamel sauce." mins={120} />
            <PlainRecipe title="Shrimp Cocktail" desc="Chilled shrimp served with tangy cocktail sauce." mins={15} />
            <PlainRecipe title="Beef Tacos Al Pastor" desc="Spiced pork tacos topped with pineapple, cilantro, and onions." mins={120} />
            <PlainRecipe title="Spinach Quiche" desc="Buttery crust filled with spinach and cheese custard." mins={55} />
          </ul>
        </div>
        <div className="flex justify-center mt-10">
          <h1 className="text-6xl">Features</h1>
        </div>
        </div>
      </div>
    </div>
  );
}
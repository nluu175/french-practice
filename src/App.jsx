import { useState, useEffect } from "react";

function GeneratePhoneNumber(amount) {
  const numbers = [];
  function GenerateSegment() {
    return Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
  }
  for (let i = 0; i < amount; i++) {
    numbers.push(
      `${GenerateSegment()} ${GenerateSegment()} ${GenerateSegment()} ${GenerateSegment()} ${GenerateSegment()}`
    );
  }
  return numbers;
}

function App() {
  const numbers = GeneratePhoneNumber(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [interval, setInterval] = useState(2);
  const [inputInterval, setInputInterval] = useState(2);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || currentIndex >= numbers.length) {
      return;
    }

    setCurrentNumber(numbers[currentIndex]);

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, interval * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, interval, isRunning]);

  const handleStart = () => {
    setCurrentIndex(0);
    setIsRunning(true);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsRunning(true);
  };

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <label className="text-lg">
          Interval (seconds):
          <input
            type="number"
            value={inputInterval}
            onChange={(e) =>
              setInputInterval(Math.floor(Number(e.target.value)))
            }
            min="1"
            className="ml-2 p-1 border rounded w-20"
          />
        </label>
        <button
          onClick={() => setInterval(inputInterval)}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set
        </button>
      </div>

      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-8">STAY FOCUS!!! 😤😤😤</h1>

        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-green-500 text-white text-xl rounded hover:bg-green-600"
          >
            Start
          </button>
        ) : (
          currentNumber !== null && (
            <div className="text-8xl font-bold text-blue-600 mb-6">
              {currentNumber}
            </div>
          )
        )}

        {isRunning && (
          <div className="text-2xl text-gray-600 mb-4">
            {currentIndex >= numbers.length ? (
              <p>All numbers have been displayed!</p>
            ) : (
              <p>
                Showing number {currentIndex + 1} of {numbers.length}
              </p>
            )}
          </div>
        )}
        {isRunning && (
          <button
            onClick={handleRestart}
            className="w-20 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg'
import './App.css'

function App() {
  return (
    
    <body>
      <nav class="bg-primary p-3">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center">
            <img src="my-project\src\img\parkl.png" alt="park"/>
          </a>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <img src={process.env.PUBLIC_URL + '/img/parklot.png'} alt="Park Lot" />
      </main>
      <footer class="bg-primary grid grid-cols-3 p-3 justify-center items-center">
        <div class="grid grid-cols-1">
          <h1>Tækniskólinn parking lot</h1>
          Front and behind of Tækniskólinn
          <p>Háteigsvegur</p>
          <p>Skólavörðuholt?</p>
          <p>Hafnafjörður</p>
        </div>
        <div class="grid grid-cols-1">
          <h1>Phone</h1>
          <p>+3546853923</p>
          <p>Contact Us</p>
        </div>
        <div class="grid grid-cols-1">
          <h1>Names</h1>
          <p>Park&Co</p>
          <p>park@park.is</p>
          <p>-VED-3F-05DU</p>

        </div>
      </footer>
    </body>
  );
}

export default App;

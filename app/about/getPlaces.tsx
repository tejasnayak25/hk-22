interface Place {
    id: string;
    name: string;
    location: string;
    image: string; // Optional if image might not exist
}


export function getPlaces(places: Array<Place>) {
    let arr = [];

    for (let i = 0; i < places.length; i++) {
        const element = places[i];
        arr.push(
            <div className="p-4 w-full">
            <div className="h-full border-2 border-[#00bcae] bg-[#005d5b] rounded-lg overflow-hidden">
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={element.image} alt="blog"/>
                <div className="p-6">
                    <h1 className="title-font text-lg font-medium font-semibold text-[#00bcae] mb-3">{element.name}</h1>
                    <p className="leading-relaxed text-gray-400 mb-3">{element.location}</p>
                    <div className="flex items-center flex-wrap">
                        <a href={`/places/${element.id}`} className=' w-full btn border-0 rounded-full bg-[#00bcae] text-white hover:bg-[#00bcafc9]'>View More</a>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    return arr;
}
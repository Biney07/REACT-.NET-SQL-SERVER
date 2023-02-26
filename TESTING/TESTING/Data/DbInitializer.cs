﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Collections.Generic;
using TESTING.Model;

namespace TESTING.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(AppDbContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@gmail.com"
                };

                await userManager.CreateAsync(admin, "Albin2002@");
                await userManager.AddToRoleAsync(admin, "Admin");

                var user = new User
                {
                    UserName = "User",
                    Email = "user@gmail.com"
                };

                await userManager.CreateAsync(user, "User2002@");
                await userManager.AddToRolesAsync(user, new[] { "Member" });
            }


          

            var Banoret = new List<Banori>
            {
  new Banori
    {
        Name = "Vedati",
        Biografia = "Vedati është një aktor shumë i njohur dhe i dashur në mesin e publikut. Ai ka interpretuar role të ndryshme në shumë filma dhe seriale të suksesshëm. Me një karrierë të gjatë në industrinë e filmit, Vedati është bërë një emër i njohur jo vetëm në Shqipëri, por edhe jashtë saj.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677109033/wkol3nlmcgyhfbxin8rp.png",
        Age = 45,
        RelationshipStatus = true,
        Profesioni = "Aktor",
        CloudanaryPublicId = "vnazgth62rjkbheosiqa",

    },
  new Banori
    {
        Name = "Mbresa",
        Biografia = "Mbresa është një vajzë shumë e ëmbël dhe talentuar, me një zë të butë dhe tërheqës. Ajo është një këngëtare e njohur dhe e dashur nga publiku i muzikës shqiptare. Me një karrierë të suksesshme në botën e muzikës, Mbresa ka fituar zemrat e shumë njerëzve me zërin e saj të bukur dhe këngët e saj të ndjeshme.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677113429/eenkdowecaxehm3dgxpi.png",
        Age = 25,
        RelationshipStatus = false,
        Profesioni = "Kengtare",
        CloudanaryPublicId = "eenkdowecaxehm3dgxpi",

    },
  new Banori
    {
        Name = "Artani",
        Biografia = "Artani është një aktor i talentuar, djali i Cimës, një aktor i njohur nga Kosova. Artani ka shfaqur aftësi të shquara në skenë dhe në ekran duke treguar një gamë të gjerë të aftësive aktoriale. Ai është shfaqur në shumë filma dhe serialet e njohura në Kosovë dhe në rajon dhe ka fituar shumë vlerësime pozitive nga publiku për talentin e tij dhe për kontributin e tij në fushën e artit.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677448450/Mbresa-Hajrullahu-Recovered_jtfz2x.png",
        Age = 35,
        RelationshipStatus = true,
        Profesioni = "Aktor",
        CloudanaryPublicId = "Mbresa-Hajrullahu-Recovered_jtfz2x",

    },
   new Banori
    {
        Name = "Xhuli",
        Biografia = "Xhuli është një model fitness-i, e cila është e vendosur të mbrojë feminizmin dhe të drejtat e grave. Ajo është një ndërmbajtëse e një platforme online, ku ajo ndan ide dhe resurse për të ndihmuar gra dhe vajza të rriten dhe të ndërtojnë vetëbesim, pavarësisht prej kufizimeve sociale dhe kulturore. Xhuli i promovon stilit të shëndetshëm të jetesës dhe e inkurajon gratë që të jenë të pavarura dhe të ndjehen rehatë me veten e tyre. ",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677421938/e85lnufty1yr9mdi4afl.png",
        Age = 32,
        RelationshipStatus = false,
        Profesioni = "Fitness Model",
        CloudanaryPublicId = "e85lnufty1yr9mdi4afl",

    },
    new Banori
    {
        Name = "Getinjo",
        Biografia = "Getinjo eshte nje rapper shume i njohur ne Shqiperi. Ai ka filluar karrieren e tij muzikore qe ne moshe te re dhe tani eshte nje nga emrat me te suksesshem ne skenen hip-hop ne vendin tone. Me muziken e tij, ai ka arritur te fitoje respektin dhe dashurine e shume fansave te tij. Gjithashtu, Getinjo eshte nje person qe ka vlera te theksuara familjare dhe shoqerore dhe eshte nje shembull per shume te rinj ne vendin tone.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677449132/Getinjo_ca3krm.png",
        Age = 29,
        RelationshipStatus = false,
        Profesioni = "Rapper",
        CloudanaryPublicId = "Getinjo_ca3krm",
        Eleminuar = true
    },
     new Banori
    {
        //Id = 6,
        Name = "Xhoni",
        Biografia = "Xhoni është një humorist me një natyrë të ëmbël dhe me një qëndrim pozitiv ndaj jetës. Ai është gjithashtu një këngëtar me muzikë interesante që shpesh e përdor në numrat e tij humoristike.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677449708/Xhoni_fesxj0.png",
        Age = 39,
        RelationshipStatus = true,
        Profesioni = "Kengtar",
        CloudanaryPublicId = "Xhoni_fesxj0",


    },
      new Banori
    {
        //Id = 7,
        Name = "Arta",
        Biografia = "Arta është një aktore tradicionale me një fjalor të mbrehet. Ajo ka shquar për paraqitjen e roleve historike dhe për aftësinë e saj të jashtëzakonshme për të shprehur emocione të ndryshme në skenë. Me një karrierë të gjatë dhe të suksesshme, Arta është një nga aktoret më të njohura në vend. Në çdo paraqitje të saj, ajo arrin të kapërcen kufijtë e fjalës dhe të ndezë shpirtërat e publikut me interpretimet e saj të jashtëzakonshme.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677357367/k8i2yxtmckjzeyeofp1s.png",
        Age = 42,
        RelationshipStatus = true,
        Profesioni = "Aktore",
        CloudanaryPublicId = "k8i2yxtmckjzeyeofp1s",

    },
           new Banori
    {
        //Id = 8,
        Name = "Stresi",
        Biografia = "Arta është një aktore tradicionale me një fjalor të mbrehet. Ajo ka shquar për paraqitjen e roleve historike dhe për aftësinë e saj të jashtëzakonshme për të shprehur emocione të ndryshme në skenë. Me një karrierë të gjatë dhe të suksesshme, Arta është një nga aktoret më të njohura në vend. Në çdo paraqitje të saj, ajo arrin të kapërcen kufijtë e fjalës dhe të ndezë shpirtërat e publikut me interpretimet e saj të jashtëzakonshme.",
        Price = 100,
        PictureUrl = "https://res.cloudinary.com/martesa-jone/image/upload/v1677160143/nobh7jynrdqaxgtitenx.png",
        Age = 37,
        RelationshipStatus = false,
        Profesioni = "Reper",
        CloudanaryPublicId = "nobh7jynrdqaxgtitenx",

    },

            };

            foreach (var banori in Banoret)
            {
                context.Banoret.Add(banori);
            }

            context.SaveChanges();
        }
    }
}

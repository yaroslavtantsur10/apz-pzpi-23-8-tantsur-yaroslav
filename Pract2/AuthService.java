1  // AuthService.java — сервіс автентифікації
 2  @RestController
 3  @RequestMapping("/auth")
 4  public class AuthController {
 5  
 6      private final String SECRET_KEY = "netflix_secret_key";
 7  
 8      @PostMapping("/login")
 9      public ResponseEntity<String> login(@RequestBody UserCredentials creds) {
10          if ("user".equals(creds.getUsername())
11                  && "pass".equals(creds.getPassword())) {
12              String token = generateToken(creds.getUsername());
13              return ResponseEntity.ok(token);
14          }
15          return ResponseEntity.status(401).body("Unauthorized");
16      }
17  
18      private String generateToken(String username) {
19          return Jwts.builder()
19                  .setSubject(username)
20                  .setExpiration(
21                      new Date(System.currentTimeMillis() + 86400000))
22                  .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
23                  .compact();
24      }
25  }
26  
27  // ApiGatewayFilter.java — перевірка токена в Gateway
28  @Component
29  public class JwtFilter implements Filter {
30  
31      private final String SECRET_KEY = "netflix_secret_key";
32  
33      @Override
34      public void doFilter(ServletRequest request,
35              ServletResponse response, FilterChain chain)
36              throws IOException, ServletException {
37          HttpServletRequest req = (HttpServletRequest) request;
38          String token = req.getHeader("Authorization");
39  
40          if (token != null && validateToken(token)) {
41              chain.doFilter(request, response);
42          } else {
43              ((HttpServletResponse) response)
44                      .sendError(401, "Invalid token");
45          }
46      }
47  
48      private boolean validateToken(String token) {
49          try {
50              Jwts.parser()
51                      .setSigningKey(SECRET_KEY)
52                      .parseClaimsJws(token);
53              return true;
54          } catch (Exception e) {
55              return false;
56          }
57      }
58  }

